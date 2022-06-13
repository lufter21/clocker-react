import FirstScreen from '../components/FirstScreen/FirstScreen';
import Main from '../components/Main/Main';
import Section from '../components/Section/Section';
import StepItem from '../components/StepItem/StepItem';
import Accordeon from '../components/Accordeon/Accordeon';
import OnlineAssessment from '../components/OnlineAssessment/OnlineAssessment';
import Faq from '../components/Faq/Faq';
import More from '../components/More/More';

function HomePage() {
	return (
		<Main>
			<FirstScreen
				title="An auction is an opportunity to sell a watch for the maximum price"
				sub_title="Using our auction, you get the highest prices on the market, as we have all the major watch pawnshops."
			/>

			<Section title="Auction process">
				<OnlineAssessment />
			</Section>

			<Section title="Why is it beneficial for you">
				<div className="row row_wrp">
					<div className="col-6">
						<StepItem
							title="Time saving"
							text="Since you do not need to go around several pawnshops in search of the best price"
						/>
					</div>
					<div className="col-6">
						<StepItem
							title="Cost immediately"
							text="You will find out the preliminary cost of watches immediately and online"
						/>
					</div>
					<div className="col-6">
						<StepItem
							title="Quick sale"
							text="You sell your watch as quickly as possible, as we hold several trades per day"
						/>
					</div>
					<div className="col-6">
						<StepItem
							title="Maximum cost"
							text="You get the maximum value due to the competition of dealers who fight for each exposed lot"
						/>
					</div>
					<div className="col-6">
						<StepItem
							title="Without fee"
							text="You do not pay commissions and fees, as dealers pay them at auctions"
						/>
					</div>
					<div className="col-6">
						<StepItem
							title="Arrival one time"
							text="You only visit one of the authorized centers once"
						/>
					</div>
				</div>
			</Section>

			<Section title="Do you have any questions?">
				<div className="wrp">
					<Faq path="api/get-content.php?id=faqAtHome">
						{(data) => (
							<More initCount="3" btnText="All questions" data={data}>
								{(result) => <Accordeon data={result} />}
							</More>
						)}
					</Faq>
				</div>
			</Section>
		</Main>
	);
}

export default HomePage;
