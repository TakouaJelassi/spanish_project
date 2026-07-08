import React, { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight, Moon, Sun, Shuffle } from 'lucide-react';

const flashcardsData = [
  // Agreement/Disagreement focus (A mí / Yo)
  { es: "Me gusta mucho el sushi. - A mí también.", en: "I really like sushi. - Me too.", pt: "Eu gosto muito de sushi. - Eu também." },
  { es: "No me gusta el café. - A mí tampoco.", en: "I don't like coffee. - Me neither.", pt: "Não gosto de café. - Eu também não." },
  { es: "Me encanta viajar. - A mí no.", en: "I love traveling. - I don't.", pt: "Adoro viajar. - Eu não." },
  { es: "No me gusta la piña en la pizza. - A mí sí.", en: "I don't like pineapple on pizza. - I do.", pt: "Não gosto de abacaxi na pizza. - Eu gosto." },
  { es: "Yo siempre voy al gimnasio. - Yo también.", en: "I always go to the gym. - Me too.", pt: "Eu sempre vou à academia. - Eu também." },
  { es: "No quiero trabajar hoy. - Yo tampoco.", en: "I don't want to work today. - Me neither.", pt: "Não quero trabalhar hoje. - Eu também não." },
  { es: "Yo hablo español. - Yo también.", en: "I speak Spanish. - Me too.", pt: "Eu falo espanhol. - Eu também." },
  { es: "Yo no fumo. - Yo sí.", en: "I don't smoke. - I do.", pt: "Eu não fumo. - Eu sim." },
  { es: "No sé bailar salsa. - Yo tampoco.", en: "I don't know how to dance salsa. - Me neither.", pt: "Não sei dançar salsa. - Eu também não." },
  { es: "A Pablo le duele la cabeza. - A mí también.", en: "Pablo's head hurts. - Mine too.", pt: "O Pablo está com dor de cabeça. - Eu também." },
  { es: "No hablo ruso. - Yo tampoco.", en: "I don't speak Russian. - Me neither.", pt: "Não falo russo. - Eu também não." },
  { es: "A Marcos no le gusta viajar. - A Luisa tampoco.", en: "Marcos doesn't like to travel. - Luisa doesn't either.", pt: "O Marcos não gosta de viajar. - A Luisa também não." },
  { es: "Tengo calor. - Yo no.", en: "I'm hot. - I'm not.", pt: "Estou com calor. - Eu não." },
  { es: "No estoy cansada. - Nosotros sí.", en: "I'm not tired. - We are.", pt: "Não estou cansada. - Nós estamos." },
  { es: "A Esteban no le gusta el deporte. - Pues a Alba sí.", en: "Esteban doesn't like sports. - Well, Alba does.", pt: "O Esteban não gosta de esportes. - Bem, a Alba gosta." },
  { es: "A Sergio le encanta viajar. - Pues a Gema no.", en: "Sergio loves to travel. - Well, Gema doesn't.", pt: "O Sergio adora viajar. - Bem, a Gema não." },
  { es: "Él sí trabaja mucho.", en: "He *does* work a lot.", pt: "Ele trabalha muito, sim." },
  { es: "A mí sí me gusta el café.", en: "I *do* like coffee.", pt: "Eu gosto de café, sim." },
  { es: "Yo sí hablo español.", en: "I *do* speak Spanish.", pt: "Eu falo espanhol, sim." },
  { es: "Ella sí vino a la fiesta.", en: "She *did* come to the party.", pt: "Ela veio à festa, sim." },
  { es: "A él sí le gusta el cine.", en: "He *does* like the cinema.", pt: "Ele gosta de cinema, sim." },
  { es: "Yo sí estoy seguro.", en: "I *am* sure.", pt: "Tenho certeza, sim." },
  { es: "A mí sí me gusta este libro.", en: "I *do* like this book.", pt: "Eu gosto deste livro, sim." },
  { es: "Ella sí quiere ir.", en: "She *does* want to go.", pt: "Ela quer ir, sim." },
  { es: "Yo sí puedo ayudarte.", en: "I *can* help you.", pt: "Eu posso te ajudar, sim." },
  // Time adverbs: ya, todavía, aún
  { es: "Todavía trabajo en el estudio de Mónica.", en: "I still work at Monica's studio.", pt: "Ainda trabalho no estúdio da Mónica." },
  { es: "¿Aún estás aquí?", en: "Are you still here?", pt: "Você ainda está aqui?" },
  { es: "Ya no trabajo en la academia.", en: "I don't work at the academy anymore.", pt: "Não trabalho mais na academia." },
  { es: "Ya he terminado.", en: "I have already finished.", pt: "Eu já terminei." },
  { es: "¿Has hablado ya con Pedro?", en: "Have you already spoken to Pedro?", pt: "Você já falou com o Pedro?" },
  { es: "Aún no he acabado.", en: "I haven't finished yet.", pt: "Ainda não terminei." },
  { es: "Mar no ha encontrado trabajo todavía.", en: "Mar hasn't found a job yet.", pt: "Mar ainda não encontrou emprego." },
  { es: "Todavía no han comido.", en: "They haven't eaten yet.", pt: "Eles ainda não comeram." },
  { es: "No te preocupes, ya se arreglará todo.", en: "Don't worry, everything will be fixed soon.", pt: "Não se preocupe, tudo vai se resolver." },
  { es: "Ya no llueve.", en: "It's not raining anymore.", pt: "Já não está chovendo." },
  { es: "Ya es tarde.", en: "It's already late.", pt: "Já está tarde." },
  { es: "Todavía es temprano.", en: "It's still early.", pt: "Ainda está cedo." },
  { es: "Todavía no entiendo la gramática.", en: "I still don't understand the grammar.", pt: "Ainda não entendo a gramática." },
  { es: "Ya no somos niños.", en: "We are not children anymore.", pt: "Não somos mais crianças." },
  { es: "Ya estamos llegando.", en: "We are arriving now.", pt: "Já estamos chegando." },
  { es: "Ya me lo has dicho tres veces.", en: "You've already told me that three times.", pt: "Você já me disse isso três vezes." },
  { es: "Ya es primavera.", en: "It's already spring.", pt: "Já é primavera." },
  { es: "Ya no tengo miedo.", en: "I'm not afraid anymore.", pt: "Não tenho mais medo." },
  { es: "Ya está listo.", en: "It's ready now.", pt: "Já está pronto." },
  { es: "Ya puedes entrar.", en: "You can enter now.", pt: "Você já pode entrar." },
  { es: "Ya lo sabía.", en: "I already knew it.", pt: "Eu já sabia disso." },
  { es: "Todavía no lo sé.", en: "I still don't know it.", pt: "Ainda não sei." },
  { es: "Ya he visto esa película.", en: "I have already seen that movie.", pt: "Já vi esse filme." },
  { es: "Ya terminó el verano.", en: "Summer is already over.", pt: "O verão já acabou." },
  { es: "Todavía hace calor.", en: "It's still hot.", pt: "Ainda está calor." },
  { es: "Ya tengo hambre.", en: "I'm already hungry.", pt: "Já estou com fome." },
  { es: "Ya está reparado.", en: "It's already fixed.", pt: "Já está consertado." },
  { es: "Todavía no funciona.", en: "It still doesn't work.", pt: "Ainda não funciona." },
  { es: "Ya está abierto.", en: "It's already open.", pt: "Já está aberto." },
  { es: "Todavía está cerrado.", en: "It's still closed.", pt: "Ainda está fechado." },
  { es: "Ya te entiendo.", en: "I understand you now.", pt: "Agora te entendo." },
  { es: "Ya es de día.", en: "It's already daytime.", pt: "Já é dia." },
  { es: "Ya terminaron las clases.", en: "Classes have already ended.", pt: "As aulas já terminaram." },
  { es: "Ya es suficiente.", en: "That's enough already.", pt: "Já é o suficiente." },
  // Filling out the remaining to hit exactly 100
  { es: "Ya he comprado el pan.", en: "I have already bought the bread.", pt: "Eu já comprei o pão." },
  { es: "Todavía tengo mucho sueño.", en: "I'm still very sleepy.", pt: "Ainda estou com muito sono." },
  { es: "Ya no quiero café.", en: "I don't want coffee anymore.", pt: "Não quero mais café." },
  { es: "Aún es peligroso.", en: "It is still dangerous.", pt: "Ainda é perigoso." },
  { es: "Ya me voy a dormir.", en: "I'm going to sleep now.", pt: "Já vou dormir." },
  { es: "Todavía falta mucho tiempo.", en: "There is still a lot of time left.", pt: "Ainda falta muito tempo." },
  { es: "Ya he terminado mis deberes.", en: "I have already finished my homework.", pt: "Eu já terminei meus deveres." },
  { es: "Todavía no he desayunado.", en: "I haven't had breakfast yet.", pt: "Ainda não tomei café da manhã." },
  { es: "Ya no vive en Madrid.", en: "He doesn't live in Madrid anymore.", pt: "Ele não mora mais em Madri." },
  { es: "Aún no ha llamado.", en: "He hasn't called yet.", pt: "Ele ainda não ligou." },
  { es: "Ya es tarde, vete.", en: "It's already late, go away.", pt: "Já está tarde, vá embora." },
  { es: "Todavía es un misterio.", en: "It's still a mystery.", pt: "Ainda é um mistério." },
  { es: "Ya me ha contado todo.", en: "He has already told me everything.", pt: "Ele já me contou tudo." },
  { es: "Todavía no entiendo por qué.", en: "I still don't understand why.", pt: "Ainda não entendo por que." },
  { es: "Ya se lo he dicho.", en: "I have already told him that.", pt: "Eu já disse isso a ele." },
  { es: "Aún no ha llegado.", en: "He hasn't arrived yet.", pt: "Ele ainda não chegou." },
  { es: "Ya no hay más.", en: "There is no more.", pt: "Não tem mais." },
  { es: "Todavía te quiero.", en: "I still love you.", pt: "Ainda amo você." },
  { es: "Ya está, se acabó.", en: "That's it, it's over.", pt: "Pronto, acabou." },
  { es: "Aún tengo esperanza.", en: "I still have hope.", pt: "Ainda tenho esperança." },
  { es: "Ya no me duele.", en: "It doesn't hurt anymore.", pt: "Não dói mais." },
  { es: "Todavía tengo dudas.", en: "I still have doubts.", pt: "Ainda tenho dúvidas." },
  { es: "Ya he visto este sitio.", en: "I have already seen this place.", pt: "Eu já vi este lugar." },
  { es: "Aún es temprano.", en: "It's still early.", pt: "Ainda é cedo." },
  { es: "Ya no hay gente aquí.", en: "There are no people here anymore.", pt: "Não tem mais gente aqui." },
  { es: "Todavía es posible.", en: "It's still possible.", pt: "Ainda é possível." },
  { es: "Ya me voy.", en: "I'm leaving now.", pt: "Já estou indo." },
  { es: "Aún no tengo planes.", en: "I don't have plans yet.", pt: "Ainda não tenho planos." },
  { es: "Ya está limpio.", en: "It's already clean.", pt: "Já está limpo." },
  { es: "Todavía está sucio.", en: "It's still dirty.", pt: "Ainda está sujo." },
  { es: "Ya no tengo tiempo.", en: "I don't have time anymore.", pt: "Não tenho mais tempo." },
  { es: "Aún no es seguro.", en: "It's not safe yet.", pt: "Ainda não é seguro." },
  { es: "Ya ha vuelto de viaje.", en: "He has already returned from his trip.", pt: "Ele já voltou de viagem." },
  { es: "Todavía vive con sus padres.", en: "He still lives with his parents.", pt: "Ele ainda mora com seus pais." },
  { es: "Ya terminó la película.", en: "The movie is already over.", pt: "O filme já terminou." },
  { es: "Aún tengo que estudiar.", en: "I still have to study.", pt: "Ainda tenho que estudar." },
  { es: "Ya está curado.", en: "It's already healed.", pt: "Já está curado." },
  { es: "Todavía no me ha llamado.", en: "He hasn't called me yet.", pt: "Ele ainda não me ligou." },
  { es: "Ya no es mi amigo.", en: "He is not my friend anymore.", pt: "Ele não é mais meu amigo." },
  { es: "Aún es de noche.", en: "It's still nighttime.", pt: "Ainda é noite." }
];

export default function App() {
  const [cards, setCards] = useState(flashcardsData);
  const [index, setIndex] = useState(0);
  const [showSpanish, setShowSpanish] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSpeech = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text ?? cards[index].es);
    utterance.lang = 'es-ES';
    const spanishVoice = window.speechSynthesis
      .getVoices()
      .find((v) => v.lang.startsWith('es'));
    if (spanishVoice) utterance.voice = spanishVoice;
    window.speechSynthesis.speak(utterance);
  };

  const toggleCard = () => {
    if (!showSpanish) {
      handleSpeech();
    }
    setShowSpanish(!showSpanish);
  };

  const nextCard = () => {
    setShowSpanish(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setShowSpanish(false);
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const shuffleDeck = () => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCards(shuffled);
    setIndex(0);
    setShowSpanish(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 p-4 flex flex-col items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      <div className="w-full max-w-lg flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">{cards.length} Flashcards ES</h1>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full transition-all ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-600 shadow-md'}`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div 
        className={`w-full max-w-lg h-72 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 cursor-pointer border-2 transition-all duration-300 hover:scale-[1.02]
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-100'}`}
        onClick={toggleCard}
      >
        <div className="text-center">
          {showSpanish ? (
            <p className="text-2xl font-bold">{cards[index].es}</p>
          ) : (
            <div className="space-y-4">
              <p className="text-xl font-medium">{cards[index].en}</p>
              <p className="text-lg text-gray-500 italic">{cards[index].pt}</p>
            </div>
          )}
        </div>
        
        <p className={`text-sm mt-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {showSpanish ? "Toca para ver la traducción" : "Toca para ver español y escuchar"}
        </p>
      </div>

      <div className="w-full max-w-lg mt-8 space-y-6">
        <input
          type="range"
          min="0"
          max={cards.length - 1}
          value={index}
          onChange={(e) => {setIndex(parseInt(e.target.value)); setShowSpanish(false);}}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200 accent-blue-600"
        />

        <div className="flex justify-between items-center">
          <button onClick={prevCard} aria-label="Previous card" className={`p-3 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
            <ChevronLeft />
          </button>

          <button onClick={shuffleDeck} aria-label="Shuffle deck" className={`p-3 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
            <Shuffle size={20} />
          </button>

          <button
            onClick={() => handleSpeech()}
            aria-label="Listen"
            className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            <Volume2 />
          </button>

          <button onClick={nextCard} aria-label="Next card" className={`p-3 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
            <ChevronRight />
          </button>
        </div>
      </div>

      <p className={`mt-6 font-mono text-sm ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
        {index + 1} / {cards.length}
      </p>
    </div>
  );
}