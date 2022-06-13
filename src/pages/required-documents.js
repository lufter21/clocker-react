import Main from '../components/Main/Main';
import Section from '../components/Section/Section';
import doc_img from '../images/doc-img.svg';

function RequiredDocumentsPage() {
    return (
        <Main className="main_f">
            <div className="main__full">
                <Section title="Required documents" className="pt-100 pb-0">
                    <div className="wrp">
                        <div className="title-h3">
                            Passport or driver license
                        </div>
                        <div className="doc-img">
                            <img src={doc_img} alt="doc" />
                        </div>
                    </div>
                </Section>
            </div>
        </Main>
    );
}

export default RequiredDocumentsPage;