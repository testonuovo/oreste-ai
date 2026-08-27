name: Build Oreste AI Cleaner on: workflow_dispatch: push: branches: - main jobs: build-cleaner: runs-on: windows-latest steps: - 
name: Checkout repository uses: actions/checkout@v4 - name: Setup Python uses: actions/setup-python@v5 with: 
python-version: "3.12" - name: Install PyInstaller shell: cmd run: | python -m pip install -
-upgrade pip python -m pip install pyinstaller - name: Verify cleaner shell: cmd run: | 
echo Current directory: cd echo. if not exist "oreste_cleaner.py" ( echo ERROR: oreste_cleaner.py not found exit /b 1 ) echo oreste_cleaner.py found. 
- name: Build Oreste AI Cleaner shell: cmd run: | python -m PyInstaller --onefile --noconsole oreste_cleaner.py - name: Install Inno Setup shell: pwsh run:
| choco install innosetup -y --no-progress - name: Create installer script shell: pwsh run: | @' #define MyAppName "Oreste AI Cleaner"
#define MyAppVersion "1.0" #define MyAppPublisher "Oreste De Chiara" #define MyAppExeName "oreste_cleaner.exe" [Setup] AppId={{A8E8F4C1-9B8A-4D7E-B5A7-123456789001} 
AppName={#MyAppName} AppVersion={#MyAppVersion} AppPublisher={#MyAppPublisher} DefaultDirName={autopf}\Oreste AI Cleaner DefaultGroupName=Oreste AI Cleaner 
OutputDir=installer OutputBaseFilename=OresteAICleanerSetup Compression=lzma SolidCompression=yes WizardStyle=modern [Files] Source: "dist\oreste_cleaner.exe"; 
DestDir: "{app}"; Flags: ignoreversion [Icons] Name: "{group}\Oreste AI Cleaner"; Filename: "{app}\oreste_cleaner.exe" Name: "{autodesktop}\Oreste AI Cleaner"; 
Filename: "{app}\oreste_cleaner.exe" [Run] Filename: "{app}\oreste_cleaner.exe"; 
Description: "Avvia Oreste AI Cleaner"; Flags: nowait postinstall skipifsilent '@ | Set-Content -Path "installer.iss" -Encoding ASCII Write-Host "installer.iss created." - name: Build installer shell: pwsh run: | $iscc = "${env:ProgramFiles(x86)}\Inno Setup 6\ISCC.exe" if (-not (Test-Path $iscc)) { $iscc = "${env:ProgramFiles}\Inno Setup 6\ISCC.exe" } if (-not (Test-Path $iscc)) { Write-Error "ISCC.exe not found" exit 1 } & $iscc "installer.iss" - name: Verify installer shell: pwsh run: | if (-not (Test-Path "installer\OresteAICleanerSetup.exe"))
{ Write-Error "Installer was not created" exit 1 } Write-Host "Installer created successfully." - name: Upload installer uses: 
actions/upload-artifact@v4 with: name: OresteAICleanerSetup path: "installer/OresteAICleanerSetup.exe" if-no-files-found: error
