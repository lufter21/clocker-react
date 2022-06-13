import Main from '../components/Main/Main';
import Section from '../components/Section/Section';
import CallbackForm from '../components/Callback/CallbackForm';

function InvestorsPage() {
    return (
        <Main>
            <Section title="Investors">
                <div className="wrp">
                    <CallbackForm />
                </div>
            </Section>
        </Main>
    );
}

export default InvestorsPage;