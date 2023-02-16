
import './StartScream.css'

const StartScream = ({startGame}) => {
    return (
        <div className="start">
        <h1>secret Word</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button onClick={startGame}>Começar a jogar</button>
        
        </div>
    )
}
export default StartScream;