import css from './Textarea.module.scss';

function Textarea(props) {
    return (
        <div className={css.wrap}>
            {!props.meta.active && !props.meta.dirty &&
                <label className={css.placeholder}>{props.placeholder}</label>
            }
            
            <textarea {...props.input} className={css.textarea}></textarea>
        </div>
    );
}

export default Textarea;