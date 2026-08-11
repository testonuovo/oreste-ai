/* =========================================
   ORESTE AI CORE
   Motore centrale dei comandi vocali
   ========================================= */

class OresteAICore {

    constructor() {

        this.riconoscimento = null;
        this.ascolto = false;

        this.comandi = [];

        this.inizializzaRiconoscimento();

    }


    /* =====================================
       INIZIALIZZAZIONE VOCALE
       ===================================== */

    inizializzaRiconoscimento() {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            console.warn(
                "Riconoscimento vocale non supportato."
            );

            return;

        }

        this.riconoscimento =
            new SpeechRecognition();

        this.riconoscimento.lang = "it-IT";

        this.riconoscimento.continuous = false;

        this.riconoscimento.interimResults = false;

        this.riconoscimento.maxAlternatives = 1;


        this.riconoscimento.onstart = () => {

            this.ascolto = true;

            this.onAscolto(true);

        };


        this.riconoscimento.onresult = (event) => {

            const testo =
                event.results[0][0]
                .transcript
                .toLowerCase()
                .trim();

            console.log(
                "Oreste AI ha ascoltato:",
                testo
            );

            this.interpretaComando(testo);

        };


        this.riconoscimento.onerror = (event) => {

            console.error(
                "Errore vocale:",
                event.error
            );

            this.onErrore(event.error);

        };


        this.riconoscimento.onend = () => {

            this.ascolto = false;

            this.onAscolto(false);

        };

    }


    /* =====================================
       AVVIA ASCOLTO
       ===================================== */

    ascolta() {

        if (!this.riconoscimento) {

            this.parla(
                "Il riconoscimento vocale non è disponibile."
            );

            return;

        }

        if (this.ascolto) {

            this.riconoscimento.stop();

            return;

        }

        this.riconoscimento.start();

    }


    /* =====================================
       REGISTRA UN COMANDO
       ===================================== */

    registraComando(nome, parole, azione) {

        this.comandi.push({

            nome: nome,

            parole: parole,

            azione: azione

        });

    }


    /* =====================================
       INTERPRETA IL COMANDO
       ===================================== */

    interpretaComando(testo) {

        for (const comando of this.comandi) {

            const riconosciuto =
                comando.parole.some(
                    parola =>
                        testo.includes(parola)
                );

            if (riconosciuto) {

                comando.azione(testo);

                return;

            }

        }


        this.comandoNonRiconosciuto();

    }


    /* =====================================
       COMANDO NON RICONOSCIUTO
       ===================================== */

    comandoNonRiconosciuto() {

        this.parla(
            "Non ho riconosciuto il comando."
        );

    }


    /* =====================================
       SINTESI VOCALE
       ===================================== */

    parla(testo) {

        if (
            !("speechSynthesis" in window)
        ) {

            return;

        }

        speechSynthesis.cancel();

        const voce =
            new SpeechSynthesisUtterance(testo);

        voce.lang = "it-IT";

        speechSynthesis.speak(voce);

    }


    /* =====================================
       EVENTI PERSONALIZZABILI
       ===================================== */

    onAscolto(stato) {

        console.log(
            "Stato ascolto:",
            stato
        );

    }


    onErrore(errore) {

        console.error(
            "Errore Oreste AI:",
            errore
        );

    }

}


/* =========================================
   CREAZIONE DELL'ASSISTENTE
   ========================================= */

const oresteAI =
    new OresteAICore();


/* =========================================
   COMANDI CANVA
   ========================================= */


/* APRI CANVA */

oresteAI.registraComando(

    "Apri Canva",

    [
        "apri canva",
        "vai a canva"
    ],

    () => {

        oresteAI.parla(
            "Va bene. Apro Canva."
        );

        window.open(
            "https://www.canva.com/",
            "_blank"
        );

    }

);


/* LOGO */

oresteAI.registraComando(

    "Logo",

    [
        "crea un logo",
        "crea logo",
        "apri loghi"
    ],

    () => {

        oresteAI.parla(
            "Va bene. Apro la sezione Loghi."
        );

        vaiA("loghi");

    }

);


/* MOCKUP */

oresteAI.registraComando(

    "Mockup",

    [
        "crea un mockup",
        "apri mockup"
    ],

    () => {

        oresteAI.parla(
            "Va bene. Apro la sezione Mockup."
        );

        vaiA("mockup");

    }

);


/* PRESENTAZIONE */

oresteAI.registraComando(

    "Presentazione",

    [
        "crea una presentazione",
        "apri presentazioni"
    ],

    () => {

        oresteAI.parla(
            "Va bene. Apro le presentazioni."
        );

        vaiA("presentazioni");

    }

);


/* VIDEO */

oresteAI.registraComando(

    "Video",

    [
        "crea un video",
        "apri video"
    ],

    () => {

        oresteAI.parla(
            "Va bene. Apro la sezione Video."
        );

        vaiA("video");

    }

);


/* SOCIAL */

oresteAI.registraComando(

    "Social",

    [
        "apri social",
        "social media"
    ],

    () => {

        oresteAI.parla(
            "Va bene. Apro i social media."
        );

        vaiA("social");

    }

);


/* CV */

oresteAI.registraComando(

    "Curriculum",

    [
        "crea un cv",
        "crea curriculum",
        "curriculum vitae"
    ],

    () => {

        oresteAI.parla(
            "Va bene. Apro il curriculum."
        );

        vaiA("cv");

    }

);


/* =========================================
   NAVIGAZIONE
   ========================================= */

function vaiA(id) {

    const elemento =
        document.getElementById(id);

    if (!elemento) {

        oresteAI.parla(
            "La sezione richiesta non è disponibile."
        );

        return;

    }

    elemento.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}