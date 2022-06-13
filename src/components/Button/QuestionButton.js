import css from './Button.module.scss';
import icon from '../../images/icons/question.svg';

function QuestionButton(props) {
    return (
        <button className={css.question} {...props}>
            <img src={icon} alt="icon" />
        </button>
    );
}

export default QuestionButton;