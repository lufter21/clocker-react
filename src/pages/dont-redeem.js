import Main from '../components/Main/Main';
import Section from '../components/Section/Section';
import watch from '../images/watch-full-front.svg';

function DontRedeemPage() {
    return (
        <Main>
            <Section title="What We Don't redeem">
                <div className="row row_wrp">
                    <div className="col-8">
                        <ul className="list">
                            <li>Antique clock</li>
                            <li>Wall clock</li>
                            <li>Cabinet clock</li>
                            <li>Electronic clock</li>
                            <li>Smart watch</li>
                            <li>Japanese clock</li>
                            <li>Replicas/replica watches</li>
                            <li>Watches for “spare parts”</li>
                            <li>Instances of watches with an incomplete set of movement or case</li>
                            <li>Watches over 30 years old, except for: Rolex, Patek Philippe</li>
                        </ul>
                    </div>
                    <div className="col-4">
                        <div className="fw-img mt--60 sm-hidden">
                            <img src={watch} alt="watch" />
                        </div>
                    </div>
                </div>
            </Section>
        </Main>
    );
}

export default DontRedeemPage;