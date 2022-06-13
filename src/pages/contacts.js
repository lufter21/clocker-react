import Main from '../components/Main/Main';
import Section from '../components/Section/Section';
import StepItem from '../components/StepItem/StepItem';
import telIcon from '../images/icons/phone.svg';
import pinIcon from '../images/icons/pin.svg';
import map from '../images/map.jpg';
import mapMob from '../images/map-mob.jpg';

function ContactsPage() {
    return (
        <Main className="main_contacts">
            <Section className="pb-0">
                <div className="wrp">
                    <StepItem
                        icon={telIcon}
                        title="+000 555 00 00"
                        linkTitle="tel:+0005550000"
                        className="mt-0"
                    />
                </div>
                <div className="wrp mt-65 xs-mt-26">
                    <StepItem
                        icon={pinIcon}
                        title="Authorized centers"
                        text="City, Street 3, 21/35<br> City, Street 5, 31/28<br> City, Street 7, 75/8"
                    />
                </div>
                <div className="mt-65 map">
                    <img src={map} alt="map" className="map__desk" />
                    <img src={mapMob} alt="map" className="map__mob" />
                </div>
            </Section>
        </Main>
    );
}

export default ContactsPage;