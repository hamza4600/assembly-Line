import { useState } from "react";
import style from "./style.module.css"

const AssemblyLineFun = ({ stages }) => {

    const createTask = () => {
        const array = [];
        for (let i = 0; i < stages.length; i++) {
            let obj = {
                name: stages[i],
                List: []
            }
            array.push(obj);
        }
        return array;
    }

    const [input, setInput] = useState("");
    const [task, setTask] = useState(createTask());

    const handelSubmit = (e) => {
        if (input === "") return;
        let newTask = {
            stage: 0,
            name: input,
            id: Math.floor(Math.random() * 1000)
        }
        setInput("");
        setTask((prev) =>
            prev.map((taskList) => {
                return taskList.name === stages[0] ? { ...taskList, List: [...taskList.List, newTask] } : taskList
            }))
    }

    const handelTaskClick = (e, item) => {
        // if stage is less than stages length
        console.log(item);
        const currentStageIndex = task.findIndex((stage) => stage.name === stages[item.stage]);
        const isAtTopofList = task[currentStageIndex].List[0].id === item.id;
        const isLastStage = item.stage === stages.length - 1;

        if (currentStageIndex < stages.length - 1 && isAtTopofList) {
            console.log("move to next stage");
            setTask((prev) =>
                prev.map((taskList) => {
                    return taskList.name === stages[item.stage + 1] ? { ...taskList, List: [...taskList.List, { ...item, stage: item.stage + 1 }] } : taskList
                }))
            setTask((prev) =>
                prev.map((taskList) => {
                    return taskList.name === stages[item.stage] ? { ...taskList, List: taskList.List.filter((list) => list.id !== item.id) } : taskList
                }))
        }
        else if (currentStageIndex > 0 && !isAtTopofList) {
            console.log("move to previus stage");
            setTask((prev) =>
                prev.map((taskList) => {
                    return taskList.name === stages[item.stage - 1] ? { ...taskList, List: [...taskList.List, { ...item, stage: item.stage - 1 }] } : taskList
                }))
            setTask((prev) =>
                prev.map((taskList) => {
                    return taskList.name === stages[item.stage] ? { ...taskList, List: taskList.List.filter((list) => list.id !== item.id) } : taskList
                }))
        }

        else if(isLastStage && isAtTopofList){
            console.log("remove from list");
            setTask((prev) =>
                prev.map((taskList) => {
                    return taskList.name === stages[item.stage] ? { ...taskList, List: taskList.List.filter((list) => list.id !== item.id) } : taskList
                }))
        }

    }

    return (
        <>
            <div className={style.main}>
                <div className={style.inner}>
                    <h1> Assembly Line</h1>

                    <div className={style.input}>
                        <label>Add Input Item :</label>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handelSubmit();
                                }
                            }}
                        />
                    </div>
                    <hr />

                    <div className={style.stages}>
                        {task.map((stage, index) => {
                            return (
                                <div key={index} className={style.stage}>
                                    <h3>{stage.name}</h3>

                                    <div className={style.list}>
                                        {stage.List.map((item, index) => {
                                            return (
                                                <div key={item.id} className={style.item}>
                                                    <p
                                                        onClick={(e) => handelTaskClick(e, item)}
                                                    >
                                                        {item.name}
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}


export default AssemblyLineFun;