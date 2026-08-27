import os
import shutil
import subprocess
import tkinter as tk
from tkinter import messagebox


def cartella_size(percorso):
    totale = 0

    if not os.path.exists(percorso):
        return 0

    for root, dirs, files in os.walk(percorso):
        for file in files:
            try:
                totale += os.path.getsize(os.path.join(root, file))
            except (PermissionError, FileNotFoundError):
                pass

    return totale


def pulisci_cartella(percorso):
    eliminati = 0

    if not os.path.exists(percorso):
        return 0

    for nome in os.listdir(percorso):
        elemento = os.path.join(percorso, nome)

        try:
            if os.path.isfile(elemento) or os.path.islink(elemento):
                eliminati += os.path.getsize(elemento)
                os.remove(elemento)

            elif os.path.isdir(elemento):
                dimensione = cartella_size(elemento)
                shutil.rmtree(elemento, ignore_errors=True)
                eliminati += dimensione

        except (PermissionError, FileNotFoundError, OSError):
            pass

    return eliminati


def formatta_mb(byte):
    return byte / (1024 * 1024)


def trova_temp():
    return os.environ.get("TEMP")


def pulisci_dns():
    try:
        subprocess.run(
            ["ipconfig", "/flushdns"],
            capture_output=True,
            text=True,
            creationflags=subprocess.CREATE_NO_WINDOW
        )
        return True
    except Exception:
        return False


def pulisci():
    temp = trova_temp()

    if not temp:
        messagebox.showerror(
            "Oreste AI Cleaner",
            "Cartella temporanea non trovata."
        )
        return

    prima = cartella_size(temp)

    risposta = messagebox.askyesno(
        "Oreste AI Cleaner",
        f"Ho trovato circa {formatta_mb(prima):.1f} MB "
        "di file temporanei.\n\n"
        "Vuoi procedere con la pulizia?"
    )

    if not risposta:
        return

    eliminati = pulisci_cartella(temp)

    dns = pulisci_dns()

    messaggio = (
        "🧹 Pulizia completata!\n\n"
        f"Spazio rimosso: {formatta_mb(eliminati):.1f} MB\n\n"
    )

    if dns:
        messaggio += "🌐 Cache DNS svuotata."
    else:
        messaggio += "⚠️ Cache DNS non svuotata."

    risultato.config(text=messaggio)


# ==========================
# INTERFACCIA
# ==========================

finestra = tk.Tk()

finestra.title("Oreste AI Cleaner")
finestra.geometry("500x350")
finestra.resizable(False, False)

titolo = tk.Label(
    finestra,
    text="🧹 ORESTE AI CLEANER",
    font=("Arial", 22, "bold")
)

titolo.pack(pady=25)

sottotitolo = tk.Label(
    finestra,
    text="Pulizia sicura dei file temporanei di Windows",
    font=("Arial", 11)
)

sottotitolo.pack()

pulsante = tk.Button(
    finestra,
    text="🧹 SCANSIONA E PULISCI",
    command=pulisci,
    font=("Arial", 14, "bold"),
    padx=20,
    pady=12
)

pulsante.pack(pady=30)

risultato = tk.Label(
    finestra,
    text="Pronto.",
    font=("Arial", 12),
    justify="center"
)

risultato.pack()

finestra.mainloop()