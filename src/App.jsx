import { useState } from 'react';
import './App.css'

function App() {
    const [list, setList] = useState([]);
    const [undid, setUndid] = useState([]);

    const handleDot = (event) => {
        const newDot = {
            Size: 10 + Math.random() * (45 - 10),
            Opacity: 10 + Math.random() * (100 - 10),
            ClientX: event.clientX, 
            ClientY: event.clientY,
            Color: 0 + Math.random() * 360
        };

        setList((prev) => [...prev, newDot]);
        setUndid([]);
    }

    const handleUndo = (event) => {
        event.stopPropagation();

        if(list.length === 0)
            return;

        const lastItem = list[list.length - 1];
        setUndid((prev) => [...prev, lastItem]);

        setList((prev) => {
            const newArr = [...prev].slice(0, -1);
            return newArr;
        });
    }

    const handleRedo = (event) => {
        event.stopPropagation();

        if(undid.length === 0)
            return;

        const lastItem = undid[undid.length - 1];
        setUndid((prev) => {
            const newArr = [...prev].slice(0, -1);
            return newArr;
        });

        setList((prev) => [...prev, lastItem]);
    }

  return (
    <div className='painel' onClick={handleDot}>
        <div className='btns'>
            <button id="btn-undo" onClick={handleUndo}>Desfazer</button>
            <button id="btn-redo" onClick={handleRedo}>Refazer</button>
        </div>
        <span className='count'>Count: { list.length} {(list.length === 1)? 'ball' : 'balls'} </span>
        {list.map((item, key) => (
            <span 
                key={key} 
                className='dot'
                style={{ top: item.ClientY, 
                        left: item.ClientX, 
                        backgroundColor: `hsl(${item.Color} 100% 50% / ${item.Opacity}%)`,
                        width: item.Size,
                        height: item.Size
                    }}
            />
        ))}
    </div>
  );
}

export default App
