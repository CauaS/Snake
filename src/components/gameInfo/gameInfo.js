import './styles.css';

function GameInfo ({description,  infomation, imageUrl }){
    return (
        <div className="game-info-content">
            {description && <span style={{ marginBottom: -18 }}>{description}</span>}
            {
                imageUrl 
                ? <img src={imageUrl} className="img-info" alt="img" /> 
                : <h3>{infomation}</h3>
            }
        </div>
    )
}

export default GameInfo;