const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const helpTextContainer = document.getElementById('help-text');
const helpParagraph = document.getElementById('help-paragraph');
const showQuestionBtn = document.getElementById('show-question-btn');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const questionCounterElement = document.getElementById('question-counter');
const resultContainer = document.getElementById('result-container');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');
const homeButton = document.getElementById('home-btn');

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 15;

// Array de preguntas con el párrafo de ayuda (hint)
const questions = [
    {
        question: "En el dilema presentado, la situación de Juan ilustra una colisión entre dos deberes o responsabilidades. ¿Cuál de los siguientes principios éticos podría ser considerado predominante en la Solución n.º 1, donde Juan elige llevar al niño al hospital?",
        answers: [
            { text: "Prioridad de los lazos familiares sobre el bienestar de un desconocido.", correct: false },
            { text: "Aplicación de una ética utilitarista que busca el mayor bien para el mayor número de personas.", correct: false },
            { text: "Adhesión a una norma moral absoluta que prohíbe el abandono de una persona herida.", correct: true },
            { text: "Un ejemplo de egoísmo ético, donde se prioriza la conciencia individual sobre el resultado de la acción.", correct: false },
            { text: "Una acción irresponsable, ya que no considera las consecuencias emocionales de no despedirse de su padre.", correct: false }
        ],
        hint: "Considera la acción de Juan en la Solución n.º 1. Elige la opción que mejor describa la motivación subyacente para su comportamiento."
    },
    {
        question: "¿Cuál es la diferencia fundamental que distingue los actos morales de los fenómenos naturales según el texto?",
        answers: [
            { text: "Los fenómenos naturales pueden ser considerados 'malos' en ciertas circunstancias, mientras que los actos humanos son siempre neutros.", correct: false },
            { text: "Los fenómenos naturales son intencionales, mientras que los actos morales son involuntarios.", correct: false },
            { text: "Los actos morales suponen intenciones subjetivas y dependen de la libertad y la elección, mientras que los fenómenos naturales están determinados por causas invariables.", correct: true },
            { text: "Los actos morales son el resultado de leyes físicas inalterables, y los fenómenos naturales son impredecibles.", correct: false },
            { text: "Los actos morales son solo aquellos que tienen consecuencias negativas, mientras que los fenómenos naturales no tienen impacto en los seres humanos.", correct: false }
        ],
        hint: "Analiza el ejemplo de la piedra y el andinista. Piensa en la diferencia fundamental en el control o la voluntad que cada uno tiene sobre sus acciones."
    },
    {
        question: "Según el texto, la principal razón por la que podemos emitir juicios morales sobre las acciones de una persona es que...",
        answers: [
            { text: "tienen consecuencias visibles en otras personas.", correct: false },
            { text: "la mayoría de la sociedad está de acuerdo en que el acto fue bueno o malo.", correct: false },
            { text: "la persona que actúa es libre y puede asumir la responsabilidad de sus actos.", correct: true },
            { text: "las acciones son siempre intencionales.", correct: false },
            { text: "los actos fueron realizados en un contexto social y político determinado.", correct: false }
        ],
        hint: "Recuerda el ejemplo del andinista que se desmaya. ¿Qué lección se extrae de ese caso con respecto a la intencionalidad y la responsabilidad?"
    },
    {
        question: "Jean-Paul Sartre sostiene que el hombre está 'condenado a ser libre'. ¿Cuál de las siguientes afirmaciones se desprende lógicamente de esta posición filosófica?",
        answers: [
            { text: "Los seres humanos pueden elegir no ser libres si así lo desean.", correct: false },
            { text: "Las normas morales son establecidas por una autoridad divina para guiar la conducta humana.", correct: false },
            { text: "La libertad es una ilusión, ya que la conducta humana está totalmente determinada.", correct: false },
            { text: "El hombre es el único responsable de inventar y seguir su propia moral, ya que no existen normas previas que lo guíen.", correct: true },
            { text: "La responsabilidad moral solo surge cuando el hombre se adhiere a las normas de su comunidad.", correct: false }
        ],
        hint: "Considera la frase 'condenado a ser libre'. ¿Qué significa para Sartre que no hay una moral preexistente?"
    },
    {
        question: "Erik Fromm presenta una posición intermedia en el debate sobre la libertad y el determinismo. ¿Qué implicación tiene su visión para el juicio moral en un contexto social y político como el de la Alemania nazi?",
        answers: [
            { text: "Los ciudadanos alemanes no podían ser juzgados moralmente porque su contexto socio-político los determinaba completamente.", correct: false },
            { text: "La ética humanista de Fromm es compatible con un determinismo total, ya que se centra en lo que es bueno para los seres humanos.", correct: false },
            { text: "Los ciudadanos alemanes podían elegir adherir o no al nazismo, lo que les permitía ser considerados moralmente responsables de sus acciones.", correct: true },
            { text: "El contexto socio-político elimina la responsabilidad moral, por lo que el nazismo no puede ser juzgado como moralmente malo.", correct: false },
            { text: "Fromm argumenta que la agresión humana es incontrolable en contextos autoritarios, lo que hace imposible el juicio moral.", correct: false }
        ],
        hint: "Analiza la diferencia entre la posición de Fromm y la de Skinner. ¿De qué manera la visión de Fromm sobre la libertad y el contexto se aplica al ejemplo del nazismo?"
    },
    {
        question: "El texto menciona que una de las condiciones para que un acto sea considerado bueno o malo es que 'tenga consecuencias o efectos posibles sobre otras personas'. ¿Qué implicación tiene esta condición para la moralidad de los 'pensamientos que no se expresan'?",
        answers: [
            { text: "Los pensamientos no pueden ser considerados moralmente buenos o malos porque no cumplen la segunda condición del juicio moral.", correct: true },
            { text: "Un pensamiento malvado es moralmente malo incluso si nunca se manifiesta.", correct: false },
            { text: "Los pensamientos solo se vuelven moralmente relevantes cuando se convierten en actos intencionales.", correct: false },
            { text: "La segunda condición es irrelevante, ya que la libertad y la responsabilidad son suficientes para el juicio moral.", correct: false },
            { text: "La única condición para el juicio moral es que el acto sea realizado por un agente libre y responsable.", correct: false }
        ],
        hint: "¿Qué ejemplos da el texto sobre actos que son 'exclusivamente privados' y por qué los excluye del juicio moral?"
    },
    {
        question: "Según la definición proporcionada, un conflicto de intereses ocurre cuando...",
        answers: [
            { text: "una persona utiliza su puesto para favorecer a otros, sin buscar un beneficio propio.", correct: false },
            { text: "se acepta un obsequio a cambio de un favor, lo cual es considerado soborno.", correct: false },
            { text: "una persona emite normas en su trabajo que le benefician directamente, como participar en la contratación de un familiar.", correct: true },
            { text: "una persona recluta a muchos miembros de su familia en una institución.", correct: false },
            { text: "un empleado miente para encubrir una conducta inapropiada de su supervisor.", correct: false }
        ],
        hint: "El texto proporciona una lista detallada de problemas éticos. Revisa esa lista y busca la definición que se ajusta a 'conflicto de intereses'."
    },
    {
        question: "El principio de integridad, según el texto, implica:",
        answers: [
            { text: "Aceptar las debilidades y limitaciones propias.", correct: false },
            { text: "Definir los valores de la institución por encima de los propios.", correct: false },
            { text: "Defender las creencias y valores personales, y rechazar la idea de que el fin justifica los medios.", correct: true },
            { text: "Mentir para proteger a un compañero o a la organización.", correct: false },
            { text: "Priorizar la eficacia y el éxito sobre la moralidad.", correct: false }
        ],
        hint: "En la sección de 'principios éticos', busca la definición de 'integridad'. ¿Qué acción se opone a ella?"
    },
    {
        question: "El texto argumenta que un determinismo total nos impediría emitir juicios morales porque...",
        answers: [
            { text: "la moralidad solo se aplica a los fenómenos naturales, no a las acciones humanas.", correct: false },
            { text: "los actos humanos, al no ser libres, serían moralmente neutros, como los fenómenos naturales.", correct: true },
            { text: "el ser humano es por naturaleza incapaz de conocer las leyes que rigen su conducta.", correct: false },
            { text: "las acciones de una persona son siempre intencionales, incluso si parecen determinadas.", correct: false },
            { text: "no se podría condenar a alguien por un asesinato, ya que no se podría probar que fue un acto intencional.", correct: false }
        ],
        hint: "Piensa en la diferencia entre una piedra que cae y un ser humano que toma una decisión. ¿Qué papel juega la libertad en esta distinción?"
    },
    {
        question: "El principio de 'Responsabilidad ciudadana' implica, además de respetar y obedecer las leyes, tener conciencia social. ¿Qué problema ético de los enumerados podría ser mitigado al aplicar este principio?",
        answers: [
            { text: "Nepotismo.", correct: false },
            { text: "Lealtad excesiva.", correct: false },
            { text: "Egoísmo.", correct: true },
            { text: "Encubrimiento.", correct: false },
            { text: "Soborno.", correct: false }
        ],
        hint: "Piensa en el significado de 'conciencia social'. ¿Cuál de los problemas éticos listados está más directamente relacionado con la falta de consideración por el bienestar de la comunidad o los demás?"
    }
];

// Función para actualizar el contador de preguntas
function updateQuestionCounter() {
    questionCounterElement.innerText = `${currentQuestionIndex + 1}/${questions.length}`;
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = score;
    resultContainer.classList.add('hide');
    homeButton.classList.add('hide');
    showHelpText();
}

function showHelpText() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    helpParagraph.innerText = currentQuestion.hint;
    helpTextContainer.classList.remove('hide');
    updateQuestionCounter();
    showQuestionBtn.addEventListener('click', showQuestion, { once: true });
}

function showQuestion() {
    helpTextContainer.classList.add('hide');
    questionText.classList.remove('hide');
    answerButtons.classList.remove('hide');

    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    startTimer();

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    questionText.classList.add('hide');
    answerButtons.classList.add('hide');
    clearTimeout(timer);
}

function selectAnswer(e) {
    clearTimeout(timer);
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        score++;
        scoreElement.innerText = score;
    }

    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true;
    });

    setTimeout(() => {
        nextQuestion();
    }, 2000);
}

function setStatusClass(element, correct) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showHelpText();
    } else {
        showResults();
    }
}

function startTimer() {
    let timeLeft = timeLimit;
    timerElement.innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearTimeout(timer);
            Array.from(answerButtons.children).forEach(button => {
                setStatusClass(button, button.dataset.correct === "true");
                button.disabled = true;
            });
            setTimeout(() => {
                nextQuestion();
            }, 2000);
        }
    }, 1000);
}

function showResults() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    homeButton.classList.remove('hide');
    finalScoreElement.innerText = `Tu puntaje final es de ${score} de ${questions.length} preguntas.`;
}

restartButton.addEventListener('click', startQuiz);
homeButton.addEventListener('click', startQuiz); // Agregamos el evento al botón de inicio

startQuiz();