import './Main.scss';

function Main(props) {
    return (
        <main className={"main" + (props.className ? ' ' + props.className : '')}>
            {props.children}
        </main>
    );
}

export default Main;