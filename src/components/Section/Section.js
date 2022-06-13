import './Section.scss';

function Section(props) {
    const classNms = props.className ? 'section ' + props.className : 'section';

    return (
        <section className={classNms} id={props.id ? props.id : null}>
            {props.title &&
                <div className="wrp">
                    <h2 className="section__title">
                        {props.title}
                    </h2>
                </div>
            }

            {props.children}
        </section>
    );
}

export default Section;