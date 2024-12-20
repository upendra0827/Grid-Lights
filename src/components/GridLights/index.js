import React, { useEffect, useRef, useState } from 'react'

const GridLights = () => {
    const [count, setCount] = useState(0)
    const [stack, setStack] = useState([])
    const grid = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ]

    const inputRefs = useRef([[], [], []])

    const clearGrid = () => {
        if (stack.length != 0) {
            const clear = setInterval(() => {
                const [i, j] = stack.at(-1)
                setStack(prev => {
                    const updatedStae = prev
                    updatedStae.pop()
                    return updatedStae
                })
                inputRefs.current[i][j].style.backgroundColor = 'white'

                if (stack.length === 0) {
                    setCount(0)
                    clearInterval(clear)
                }
            }, 300);
        }
    }

    useEffect(() => {
        if (count === 8) {
            clearGrid()
        }
    }, [count])

    const handleClick = ({ i, j }) => {
        if (`${i}-${j}` != '1-1') {
            inputRefs.current[i][j].style.backgroundColor = 'green'
            setStack(prev => [...prev, [i, j]])
            setCount(prev => prev + 1)
        }
    }

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
        }}>
            {grid.map((each, i) => {
                return (
                    <div
                        key={i}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '20px',
                        }}
                    >
                        {each.map((cell, j) => {
                            return (
                                <div
                                    ref={e => {
                                        inputRefs.current[i][j] = e
                                    }}
                                    className={`${i}-${j}`}
                                    key={`${i}-${j}`}
                                    style={{
                                        border: cell != 0 ? '1px solid black' : 'none',
                                        height: '100px',
                                        width: '100px',
                                        cursor: cell != 0 ? 'pointer' : 'default'
                                    }}
                                    onClick={() => handleClick({ i, j })}
                                >{''}</div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default GridLights
