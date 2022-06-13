import Main from '../components/Main/Main';
import Section from '../components/Section/Section';
import FirstScreen from '../components/FirstScreen/FirstScreen';
import BorderButton from '../components/Button/BorderButton';

function GeneralTermsPage() {
    return (
        <Main>
            <FirstScreen
                title="We buy only wrist and pocket watches and chronographs of Swiss brands, worth"
                bold_tit="from $3000"
            />

            <Section>
                <div className="wrp">
                    <BorderButton
                        link="/what-we-buying/brands"
                        name="List of brands he works with Clocker"
                    />
                </div>
                <div className="wrp mt-100 xs-mt-16">
                    <BorderButton
                        link="/what-we-buying/dont-redeem"
                        name="Which watches do you not buy?"
                    />
                </div>
                <div className="wrp mt-100 xs-mt-16">
                    <BorderButton
                        link="/"
                        name="Can I cancel a sale?"
                    />
                </div>
            </Section>
        </Main>
    );
}

export default GeneralTermsPage;