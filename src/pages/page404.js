import Main from '../components/Main/Main';
import FirstScreen from '../components/FirstScreen/FirstScreen';

function Page404() {
    return (
        <Main>
            <FirstScreen
                className="mb-0"
                title="Page not found"
                bold_tit="404"
            />
        </Main>
    );
}

export default Page404;