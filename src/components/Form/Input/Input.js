import css from './Input.module.scss';

function Input(props) {
    return (
        <div className={css.wrap}>
            {!props.meta.active && !props.input.value &&
                <label className={css.placeholder} style={props.phColor ? { color: props.phColor } : {}}>{props.placeholder}</label>
            }

            <input
                className={!!props.signBefore ? css.input + ' ' + css.input_signBefore : css.input}
                onInput={props.onInput}
                {...props.input}
            />

            {!!props.signBefore && (props.meta.active || !!props.input.value) &&
                <div className={css.signBefore}>
                    {props.signBefore}
                </div>
            }

            {!!props.signAfter && (props.meta.active || !!props.input.value) &&
                <div className={css.signAfter}>
                    <div className={css.signAfter__val}>
                        {props.input.value}
                    </div>
                    <div className={css.signAfter__sign} dangerouslySetInnerHTML={{__html: props.signAfter}}></div>
                </div>
            }

            {props.icon &&
                <img src={props.icon} alt="icon" className={css.icon} />
            }
        </div>
    );
}

export default Input;