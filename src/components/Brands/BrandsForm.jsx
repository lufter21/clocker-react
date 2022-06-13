import { Field, Form } from 'react-final-form';
import Input from '../Form/Input/Input';
import searchSvg from '../../images/icons/search.svg';
import searchSvgWh from '../../images/icons/search-wh.svg';

function BrandsForm({ setSearch, search, color }) {
	const onInput = (e) => {
		setSearch({ ...search, title: e.target.value });
	};

	return (
		<Form onSubmit={() => { }}>
			{(props) => (
				<form onSubmit={props.handleSubmit}>
					<Field
						name="find_brand"
						placeholder="Search"
						render={(props) => {
							return (
								<Input
									{...props}
									onInput={onInput}
									icon={color === 'white' ? searchSvgWh : searchSvg}
									phColor="#BBBBBB"
								/>
							);
						}}
					/>
				</form>
			)}
		</Form>
	);
}

export default BrandsForm;
