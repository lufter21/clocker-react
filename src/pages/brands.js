import { useState } from 'react';
import { useGetBrandsQuery } from '../app/services/watchApi';
import Main from '../components/Main/Main';
import Section from '../components/Section/Section';
import BrandsItems from '../components/Brands/Brands';
import BrandsForm from '../components/Brands/BrandsForm';
import watch from '../images/watch-full.svg';

function BrandsPage() {
	const [search, setSearch] = useState({ title: '', limit: 99999 });
	const { data = [], isLoading } = useGetBrandsQuery(search);

	return (
		<Main>
			<Section title="Brands">
				<div className="wrp">
					<BrandsForm setSearch={setSearch} search={search} />
				</div>
				<div className="row row_wrp mt-80">
					<div className="col-4">
						<BrandsItems data={data} isFetching={isLoading} />
					</div>
					<div className="col-8">
						<div className="fw-img fw-img_xs-brand">
							<img src={watch} alt="watch" />
						</div>
					</div>
				</div>
			</Section>
		</Main>
	);
}

export default BrandsPage;
