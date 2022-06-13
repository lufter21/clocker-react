import { Link } from 'react-router-dom';
import css from './StepItem.module.scss';

function StepItem(props) {
    let title = props.title;

    if (props.linkTitle) {
        if (props.linkTitle.includes('tel:') || props.linkTitle.includes('mailto:')) {
            title = <><a href={props.linkTitle}>{props.title}</a></>;
        } else {
            title = <Link to={props.linkTitle}>{props.title}</Link>;
        }
    }

    let style = props.num ? css.step + ' ' + css.step_num : css.step;

    if (props.icon) {
        style += ' ' + css.step_icon;
    }

    const classNms = props.className ? style + ' ' + props.className : style;

    const text = () => ({__html: props.text});

    return (
        <div className={classNms} data-num={props.num} data-border={props.border}>
            {props.icon &&
                <div className={css.iconWrap}>
                    <img src={props.icon} alt="icon" />
                </div>
            }

            <div className={css.step__title}>
                {title}
            </div>

            {props.text &&
                <div className={css.step__text}>
                    <span dangerouslySetInnerHTML={text()} />
                </div>
            }
        </div>
    );
}

export default StepItem;