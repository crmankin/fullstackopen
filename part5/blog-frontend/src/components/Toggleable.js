import { useState, forwardRef, useImperativeHandle } from 'react';

const Toggleable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisible = () => {
        setVisible(!visible);
    };

    useImperativeHandle(refs, () => {
        return { toggleVisible };
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisible}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisible}>Cancel</button>
            </div>
        </div>
    );

});

export default Toggleable;
