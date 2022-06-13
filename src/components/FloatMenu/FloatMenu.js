import { useEffect, useRef } from 'react';
import './FloatMenu.scss';

const Item = function (props) {
    const onClick = function () {
        props.onClick(props.anchor);
    }

    return (
        <div className="col-fill">
            <button className="float-menu__btn" data-anchor={props.anchor} onClick={onClick}><span>{props.name}</span></button>
        </div>
    );
}

function FloatMenu(props) {
    const floatRef = useRef();

    const scrTo = function (id) {
        window.scrollTo(0, document.getElementById(id).getBoundingClientRect().top + window.pageYOffset);
    }

    const items = props.items.map(item => <Item onClick={scrTo} {...item} key={item.anchor} />);

    useEffect(() => {
        const floatEl = floatRef.current,
            headerEl = document.getElementById('header'),
            sectionEls = document.querySelectorAll('.section');

        window.addEventListener('scroll', function () {
            const winCenterEdge = window.innerHeight - 100;
            const floatElOffsetTop = floatEl.getBoundingClientRect().top;

            if (floatElOffsetTop <= headerEl.offsetHeight) {
                floatEl.classList.add('fixed');
            } else {
                floatEl.classList.remove('fixed');
            }

            for (const sectEl of sectionEls) {
                if (sectEl.getBoundingClientRect().top <= winCenterEdge) {
                    const btn = floatEl.querySelector('[data-anchor="' + sectEl.id + '"]');
                    if (btn) {
                        btn.classList.add('active');
                    }
                } else {
                    const btn = floatEl.querySelector('[data-anchor="' + sectEl.id + '"]');
                    if (btn) {
                        btn.classList.remove('active');
                    }
                }
            }
        });
    }, [floatRef]);

    return (
        <div ref={floatRef} className="float-menu">
            <div className="float-menu__fix">
                <div className="row row_wrp row_nw">
                    {items}
                </div>
            </div>
        </div>
    );
}

export default FloatMenu;