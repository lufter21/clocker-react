import { useNavigate, Link } from 'react-router-dom';
import { useGetAuctionsHistoryQuery } from '../app/services/auctionsApi';
import { useDispatch, useSelector } from 'react-redux';
import { showAuth } from '../app/popupSlice';
import { isUserLogin } from '../app/userDataSlice';
import Main from '../components/Main/Main';
import Section from '../components/Section/Section';
import FirstScreen from '../components/FirstScreen/FirstScreen';
import StepItem from '../components/StepItem/StepItem';
import img1 from '../images/st-img-1.svg';
import img2 from '../images/st-img-2.svg';
import ImgStepItem from '../components/ImgStepItem/ImgStepItem';
import Faq from '../components/Faq/Faq';
import Accordeon from '../components/Accordeon/Accordeon';
import Lots from '../components/Lots/Lots';
import Loader from '../components/Loader/Loader';

let isMobile = window.matchMedia(`(max-width: 1000px)`).matches;

function Page() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userLogin = useSelector(isUserLogin);
	const { data, isLoading } = useGetAuctionsHistoryQuery();

	const auth = () => {
		Number(localStorage.getItem('role')) === 2 ? navigate('/cabinet') : dispatch(showAuth());
	};

	return (
		<>
			<Main>
				<FirstScreen
					title="Clocker – auction №1 in the watch market"
					title_sm="Participate in Swiss watch auctions"
					sub_title="Secure entry to the largest Swiss brand watch auctions"
					stepOne="step-one"
					btn_render={() => {
						if (userLogin) {
							return (
								<Link to="/cabinet/" className="btn step-two">
									Join to the auction
								</Link>
							);
						} else {
							return (
								<button className="btn step-two" onClick={auth}>
									Join to the auction
								</button>
							);
						}
					}}
				/>

				<Section title="How it works">
					<div className="row row_wrp">
						<div className="col-6 step-three-mobile">
							<StepItem className="step-three" title="Several auctions run daily" />
						</div>
						<div className="col-6 step-four-mobile">
							<StepItem
								className={isMobile ? 'step-four' : 'step-five'}
								title="To participate, you need to register on the site and make a deposit"
							/>
						</div>
						<div className="col-6 step-five-mobile">
							<StepItem
								className={isMobile ? 'step-five' : 'step-four'}
								title="Auction takes place within 30 - 40 minutes"
							/>
						</div>
						<div className="col-6 step-six-mobile">
							<StepItem
								className="step-six"
								title="Free demo mode for a week (to test the operation of the auction)"
							/>
						</div>
					</div>
				</Section>

				<Section>
					<div className="row row_wrp step-seven">
						<div className="col-6">
							<ImgStepItem
								image={img1}
								title="Full transparency"
								text="You get a full description and an authenticated watch. We are financially responsible for this."
							/>
						</div>
						<div className="col-6">
							<ImgStepItem
								image={img2}
								title="Pricing"
								text="You pay for the watch the amount that you set during the auction (in case your bid won the auction)."
							/>
						</div>
					</div>
				</Section>

				<Section title="History of completed auctions">
					<div className="wrp">
						{isLoading && <Loader />}
						{!isLoading && !!data && <Lots lots={data} />}
					</div>
				</Section>

				<Section title="Questions and answers">
					<div className="wrp step-nine">
						<Faq path="api/get-content.php?id=faqForDealers">
							{(data) => <Accordeon data={data} isForDealers={true} />}
						</Faq>
					</div>
				</Section>
			</Main>
		</>
	);
}

function ForDealersPage() {
	return <Page />;
}

export default ForDealersPage;
