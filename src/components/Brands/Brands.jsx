import './Brands.scss';
import { Field } from 'react-final-form';
import CheckBox from '../Form/CheckBox/CheckBox';
import Loader from '../Loader/Loader';

const Item = function (props) {
	return <li>{props.li}</li>;
};

const CheckboxItem = function (props) {
	return (
		<li>
			<Field
				name="notifyBrands"
				type="checkbox"
				label={props.li}
				value={props.id}
				render={(props) => <CheckBox {...props} />}
			/>
		</li>
	);
};

const Block = function (props) {
	const listItems = props.items.map((item) => {
		if (props.isCheckbox) {
			return <CheckboxItem li={item.title} id={item.id} key={item.id} />;
		} else {
			return <Item li={item.title} key={item.id} />;
		}
	});

	return (
		<div className="brands__block">
			<div className="brands__block-tit">{props.letter}</div>
			<ul className="brands__list">{listItems}</ul>
		</div>
	);
};

function BrandsItems({ data = [], isFetching, isCheckbox }) {
	console.log(data);
	const firstLetters = data.map((brand) => brand.title[0]);
	const lettersUnique = [...new Set(firstLetters)];

	const blocks = lettersUnique.map((letter) => {
		return {
			letter,
			items: data.filter((brand) => brand.title[0] === letter),
		};
	});

	const blocksMaps = blocks.map((item) => <Block isCheckbox={isCheckbox} {...item} key={item.letter} />);

	return isFetching ? <Loader /> : blocksMaps;
}

export default BrandsItems;