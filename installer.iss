#define MyAppVersion "1.0"
#define MyAppPublisher "Oreste De Chiara"
#define MyAppExeName "oreste_cleaner.exe"

[Setup]
AppId={{A8E8F4C1-9B8A-4D7E-B5A7-123456789001}
AppName=Oreste AI Cleaner
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={autopf}\Oreste AI Cleaner
DefaultGroupName=Oreste AI Cleaner
OutputDir=installer
OutputBaseFilename=OresteAICleanerSetup
Compression=lzma
SolidCompression=yes

[Files]
Source: "dist\oreste_cleaner.exe"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\Oreste AI Cleaner"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\Oreste AI Cleaner"; Filename: "{app}\{#MyAppExeName}"

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "Avvia Oreste AI Cleaner"; Flags: nowait postinstall skipifsilent
