import css from './ImgStepItem.module.scss';

function ImgStepItem(props) {
    return (
        <div className={css.step}>
            <div className={css.step__image}>
                <img src={props.image} alt={props.title} />
            </div>
            <div className={css.step__title}>
                {props.title}
            </div>
            {props.text &&
                <div className={css.step__text}>
                    {props.text}
                </div>
            }
        </div>
    );
}

export default ImgStepItem;