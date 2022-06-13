import Main from '../components/Main/Main';
import Section from '../components/Section/Section';
import ReviewsItems from '../components/Reviews/Reviews';
import ReviewsForm from '../components/Reviews/ReviewsForm';

function ReviewsPage() {
    return (
        <Main>
            <Section title="Reviews">
                <div className="wrp">
                    <ReviewsItems />
                </div>
            </Section>
            <Section title="Leave your feedback">
                <div className="wrp">
                    <ReviewsForm />
                </div>
            </Section>
        </Main>
    );
}

export default ReviewsPage;