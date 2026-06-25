import { createContext, useContext, useState } from "react"
import { Button, Container, Form, Row } from "react-bootstrap"
import { Link, Navigate, useNavigate } from "react-router";



function homeScreen() {
    const [size, setSize] = useState("5")
    const [Gamemode, setGamemode] = useState(false);
    const [colours, setColours] = useState("4");
    
    enum difficultys{
        Easy = 0,
        Medium = 1,
        Hard = 2
    }
    const [difficutly, setDifficulty] = useState(1);

    const navigate = useNavigate();
    return (
        <Container>

            <Container className="bg-tertiary p-1 w-50 my-5 rounded-3 shadow-lg justify-content-center text-center">
                <Form className="justify-content-center w-100">
                    <Row>
                        <Form.Label className=" fs-2">
                            Settings For Game
                        </Form.Label>
                    </Row>
                    <Form.Label className="fs-4">
                        Game mode
                    </Form.Label>
                    <Container className="d-flex justify-content-center">
                        <Form.Check type="switch"
                            onChange={(e) => setGamemode(e.target.checked)}
                            className="justify-content-center" />
                    </Container>
                    <Form.Label className="fs-2 text-decoration-underline ">
                        {Gamemode ? "Colours" : "Numbers"}
                    </Form.Label>
                    <br />
                    <Form.Label className="fs-4">
                        Difficulty
                    </Form.Label>
                    <br />
                    <Form.Range min={0} max={2} step={1} onChange={(e) => setDifficulty(Number(e.target.value))} className="w-50" />
                    <Row className="justify-content-center d-flex mb-3 fs-5">
                        {difficultys[difficutly]}
                    </Row>
                    {Gamemode ?
                        (
                            <Container>
                                <Form.Label>Memorize colours and click start when ready. Group the same colours together. After done a group go to the next one </ Form.Label>
                                <br />
                                <Form.Label className="fs-4">Colour Groups</Form.Label>
                                <br />
                                <Form.Range min={2} max={6} step={1} onChange={(e) => setColours(e.target.value)} className="w-50" />
                                <br />
                                {colours}
                            </Container>
                        ) :
                        (
                            <Form.Label className="text-center">Memorize numbers and click start when ready. After select numbers in sequental order</Form.Label>
                        )
                    }
                    <Container>
                            <Button variant="primary"
                                onClick={() => navigate(`/game/${Gamemode}/${difficultys[difficutly]}/${colours}`)
                                }

                            >Start Game!</Button>
                    </Container>

                </Form>
            </Container>

        </Container >
    )

}

export default homeScreen
