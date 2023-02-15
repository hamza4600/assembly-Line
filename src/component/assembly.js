import React from 'react';


class AssemblyLine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addArr: [],
            currentStage: 0,
            itemStage: 0,
            newStage: 0,
            moveArr: []
        }
    }

    //   move to new Stage to clicked item  and remove from current stage
    //   show clicked item in next stage only
    nextStage = (item, index) => {
        const { addArr, currentStage, itemStage, newStage, moveArr } = this.state;
        const { stages } = this.props;
        const newAddArr = [...addArr];
        const newMoveArr = [...moveArr];
        const newCurrentStage = currentStage + 1;
        const newItemStage = itemStage + 1;
        newAddArr.splice(index, 1);
        newMoveArr.push(item);


        console.log(newStage);
        // if click on same stage dont move to next stage only remove from current stage and add to newAddArr
        if (stages[newStage] === stages[currentStage]) {
            this.setState({
                addArr: newAddArr,
                moveArr: newMoveArr,
                newStage: newStage + 1,
            })
        }
        // if click on next stage move to next stage and remove from current stage and add to newAddArr
        else if (stages[newStage] !== stages[currentStage]) {
            this.setState({
                addArr: newAddArr,
                currentStage: newCurrentStage,
                itemStage: newItemStage,
                moveArr: newMoveArr,
            })
        }



        if (newCurrentStage === stages.length - 1) {
            newMoveArr.splice(index, 1);
        }
        console.log(newMoveArr, item);
    }

    render() {
        const { stages } = this.props;
        const { addArr } = this.state;
        console.log(this.state);

        return (
            <div>
                <h1>Assembly Line</h1>

                <input type="text"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (e.target.value !== "") {
                                let newItems = [e.target.value, ...addArr];
                                this.setState({
                                    addArr: newItems
                                })
                                e.target.value = "";
                            }
                        }
                    }}
                />
                <div id="assly"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        maxWidth: "500px",
                    }}
                >
                    {Array.isArray(stages) && stages.map((stage, index) => (
                        <div key={index}>
                            <div>{stage}</div>
                            <div
                                style={{
                                    border: "1px solid black",
                                    width: "100px",
                                    minHeight: "100px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: this.state.currentStage === index ? "green" : "white"
                                }}
                            >
                                {index === 0 && addArr.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => this.nextStage(item, index)}
                                    >{item}</div>
                                ))}
                                {
                                    (stages[this.state.newStage] === stage) && (index !== 0) &&
                                    <div>
                                        {this.state.moveArr.map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() => this.nextStage(item, index)}
                                            >{item}</div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}


export default AssemblyLine;
