import { useDispatch } from 'react-redux';
import { showInfo } from '../../app/popupSlice';
import QuestionButton from '../Button/QuestionButton';
import StepItem from '../StepItem/StepItem';
import PreEstimateForm from './PreEstimateForm';

function OnlineAssessment() {
    const dispatch = useDispatch();

    const openInfo = function () {
        dispatch(showInfo({
            title: 'Instructions for the photo',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, nobis rem saepe numquam voluptates blanditiis illo sunt nisi et, possimus impedit, obcaecati deserunt incidunt assumenda provident. Impedit cupiditate veniam sit.'
        }));
    }

    return (
        <>
            <div className="row row_wrp row_col-middle pos-r">
                <div className="col-10">
                    <StepItem
                        num="1"
                        border="solid"
                        title="Submit your data for evaluation"
                        text="Preliminary calculation of the cost of watch" />
                </div>
                <div className="col-2 ta-r quest-button-wrap">
                    <QuestionButton onClick={openInfo} />
                </div>
            </div>
            <div className="wrp">
                <PreEstimateForm />
            </div>
            <div className="row row_wrp">
                <div className="col-6">
                    <StepItem
                        num="2"
                        title="Get feedback evaluation result" />
                </div>
                <div className="col-6">
                    <StepItem
                        num="3"
                        title="Coordinate your arrival time" />
                </div>
                <div className="col-6">
                    <StepItem
                        num="4"
                        title="Bring your watch to one of our service centers" />
                </div>
                <div className="col-6">
                    <StepItem
                        num="5"
                        title="Get money in cash or on a card" />
                </div>
            </div>
        </>
    );
}

export default OnlineAssessment;