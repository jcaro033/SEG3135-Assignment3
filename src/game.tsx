import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";




function Game() {
    const { game, difficulty, colours } = useParams();
    const numberColours: number = Number(colours);
    const colourGame = (game === "true");
    const [globalShow, setGlobalShow] = useState(true);
    let [lastClicked, setLastClicked] = useState(-1);
    let [values, setValues] = useState<number[]>([]);
    let [colorArray, setColorArray] = useState<number[]>([]);
    let [gameActive, setGameActive] = useState(false);
    let [gameWon, setGameWon] = useState(false);
    let [gameEnded, setGameEnded] = useState(false);
    let columbs: number;
    let elementSize: number;

    //convert difficulty to number of rows
    switch (difficulty) {
        case "Easy":
            columbs = 3;
            elementSize = 4;
            break;

        case "Medium":
            columbs = 4;
            elementSize = 3;
            break;

        case "Hard":
            columbs = 6;
            elementSize = 2;
            break;


    }



    useEffect(() => {
        createValues()
    }, [difficulty, colourGame]);

    //creates values for grid
    function createValues() {

        let series: number[] = [];
        if (colourGame) {
            //colour gameode
            setLastClicked(-1);
            let colourSeries: number[];
            colourSeries = [];
            //distribute values
            for (let i = 0; i < numberColours; i++) {
                colourSeries[i] = Math.floor((columbs ** 2) / numberColours);
            }
            for (let i = 0; i <= (columbs ** 2) % numberColours - 1; i++) {
                colourSeries[i]++;
            }
            setColorArray(colourSeries);

            //create values
            for (let i = 0; i < colourSeries.length; i++) {
                for (let j = 0; j < colourSeries[i]; j++) {
                    series.push(i);
                }
            }
            shuffleArray(series)
            setValues(series);

        }
        else {
            //numbers gamemode
            setLastClicked(0);
            for (let i = 1; i <= columbs ** 2; i++) {
                (series).push(i);
            }
            console.log(series);
            shuffleArray(series);
        }
        setValues(series);
    }

    /**
     * Shufles the array elements of series
     */
    function shuffleArray(series: number[]) {
        let size = series.length;
        //go through list and swap values
        for (let i = size - 1; i != 0; i--) {
            let rand = Math.floor(Math.random() * size);
            let temp = series[i];
            series[i] = series[rand];
            series[rand] = temp
        }



    }
    function checkResult(clickedElement: number) {
        console.log("------------")
        if (colourGame) {
            //for Colour Game
            console.log(clickedElement);
            console.log(lastClicked);
            console.log("-")
            console.log(colorArray[clickedElement]);

            if (lastClicked == -1) {
                //no grouping selected
                setLastClicked(clickedElement);
                decementArray(clickedElement);
                console.log("here")
                return;
            }

            if (lastClicked != clickedElement) {
                //gameLost
                setGameWon(false);
                setGameEnded(true);
                setGameActive(false);
                setGlobalShow(true);
                console.log("Game End");
                console.log(clickedElement);
                console.log(lastClicked);
                return;

            }
            //remove value from remaining colours left array 
            decementArray(clickedElement)

            if (colorArray[clickedElement] == 0)
                setLastClicked(-1);
            if (checkEmpty()) {
                //no more elements
                //Game Won
                setGameWon(true);
                setGameEnded(true);
                setGameActive(false);
                setGlobalShow(true);
                console.log("Game Won");
                return;
            }


        } else {
            //number game


            //checked if failed
            if ((lastClicked + 1) != clickedElement) {
                //game lost
                setGameWon(false);
                setGameEnded(true);
                setGameActive(false);
                setGlobalShow(true);
                console.log("Game End");
            } else if (clickedElement == values.length) {
                //game won
                setGameWon(true);
                setGameEnded(true);
                setGameActive(false);
                setGlobalShow(true);
                console.log("Game Won");
            } else {
                //go to next element
                setLastClicked(clickedElement);
            }

        }

        //decrent the array of colours left
        function decementArray(element: number) {
            let temp = colorArray;
            temp[element]--;
            setColorArray(temp);
        }
        //checks if the colour array is empty or not
        function checkEmpty() {
            for (let i = 0; i < colorArray.length; i++) {
                if (colorArray[i] != 0)
                    return false;
            }
            return true;
        }
    }


    // for (let i = 0; i < series.length; i++) {
    //     elements.push(<MemoryCard key={i} data={series[i]} />);
    //  }


    //array to store the colours if gamemode selected
    return (
        <Container className="">

            <Container className="d-flex justify-content-center `">
                <Button onClick={() => {
                    if (!gameActive) {
                        setGlobalShow(false);
                        setGameActive(true);
                    } else {
                        //rest all values
                        setGameWon(false);
                        setGameEnded(false);
                        createValues();
                        setGameActive(false);
                        setGlobalShow(true);

                    }
                }}
                    className="fs-4 mt-4"
                > {gameActive ? "Reset" : "Start Game"}
                </Button>
            </Container>
            <Container className="position-relative d-flex justify-content-center align-items-center">
                <Container className="w-50 bg-purple rounded-2 p-3 shadow d-flex my-5 justify-content-center"
                >
                    <Row className="g-3 w-100">
                        {values.map((value, i) => (<MemoryCard key={i}
                            data={value}
                            checkResult={checkResult}
                            colourGame={colourGame}
                            globalShow={globalShow}
                            elementSize={elementSize}
                            gameActive={gameActive} />))}
                    </Row>

                </Container>
                {gameEnded && (
                    <div className="position-absolute w-25 h-25 bg-secondary bg-opacity-80 rounded-2 d-flex justify-content-center align-items-center flex-column">
                        <h4 className="text-center">{gameWon ? "You won!" : "You Lost"}</h4>
                        <Button onClick={() => {
                            setGameWon(false);
                            setGameEnded(false);
                            createValues();
                            setGameActive(false);
                            setGlobalShow(true);
                        }}
                        className=" p-2">Reset</Button>
                    </div>)}
            </Container>


        </Container>
    )
}
type MemoryCardProps = {
    data: number;
    checkResult: (clickedElement: number) => void;
    colourGame: boolean;
    globalShow: boolean;
    elementSize: number;
    gameActive: boolean;
};

function MemoryCard({ data, checkResult, colourGame, globalShow, elementSize, gameActive }: MemoryCardProps) {

    const [showCard, setShowCard] = useState(false);

    function convertNumberColour(colorIndex: number) {
        switch (colorIndex) {
            case 0:
                return "#7cee53"
                break;
            case 1:
                return "#293698"
                break;
            case 2:
                return "#f5ff2d"
                break;
            case 3:
                return "#f01414"
                break;
            case 4:
                return "#ef41e4"
                break;
            case 5:
                return "#00d5ff"

        }
    }

    useEffect(() => setShowCard(false), [globalShow,])
    return (
        <Col className={`col-${elementSize} `}>
            <Card className={`${colourGame && (showCard || globalShow) ? "" : "bg-tertiary"} d-flex h-100 justify-content-center align-items-center  `}
                onClick={() => { if (gameActive) { checkResult(data); setShowCard(true); } }}
                //set background color to value 
                style={{ backgroundColor: (colourGame && (showCard || globalShow)) ? `${convertNumberColour(data)}` : "", aspectRatio: 1 / 1 }}>
                <h4 className="text-center border-0 " >{showCard || globalShow ? (!colourGame) ? data : " " : "?"}</h4>

            </Card>

        </Col>
    )

}
export default Game
