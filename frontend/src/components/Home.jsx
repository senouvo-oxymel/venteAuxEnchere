import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FaGavel, FaLightbulb, FaCogs, FaUserPlus, FaHandPointer, FaTrophy } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import SlidingBanner from "./SlidingBanner";

const Home = () => {
	const { t } = useTranslation();

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section with gradient background */}
			<div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white w-full">
				<div className="container mx-auto px-container-padding py-12 xs:py-16 sm:py-24 lg:flex lg:items-center lg:justify-between lg:space-x-12">
					{/* Left side - Text and Button */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
					>
						<h1 className="mt-4 text-display-2 xs:text-display-1 font-extrabold text-white leading-tight">
							{t('welcome')}
						</h1>
						<p className="mt-6 max-w-xl text-lg text-gray-200 leading-relaxed">
							{t('intro')}
						</p>
						<div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
							<a
								href="/auctions"
								className="inline-block px-8 py-4 text-lg font-bold text-white bg-red-500 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-400/50 transition-all duration-300"
								aria-label={t('view_auctions')}
							>
								{t('view_auctions')}
							</a>
						</div>
						<SlidingBanner />
					</motion.div>

					{/* Right side - Image/Visual Element */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="lg:w-1/2 flex justify-center lg:justify-end"
					>
						<img 
							src="/images/auction-hero.jpg" 
							alt="Auction illustration" 
							className="w-full max-w-md rounded-lg shadow-2xl object-cover"
							style={{ maxHeight: '500px' }}
						/>
					</motion.div>
				</div>
			</div>

			{/* Feature Cards Section */}
			<section className="bg-white py-12 w-full">
				<div className="container mx-auto px-container-padding mt-20">
					<h2 className="text-heading-1 font-bold text-center text-gray-800 mb-12">Our Key Features</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						<FeatureCard
							title={t('features.live_title')}
							description={t('features.live_desc')}
							icon={<FaGavel className="text-blue-500 text-4xl" aria-label={t('features.live_title')} />}
						/>
						<FeatureCard
							title={t('features.strategize_title')}
							description={t('features.strategize_desc')}
							icon={<FaLightbulb className="text-pink-500 text-4xl" aria-label={t('features.strategize_title')} />}
						/>
						<FeatureCard
							title={t('features.manage_title')}
							description={t('features.manage_desc')}
							icon={<FaCogs className="text-green-500 text-4xl" aria-label={t('features.manage_title')} />}
						/>
					</div>
				</div>
			</section>

			{/* How it works section */}
			<section className="bg-white py-12 w-full">
				<div className="container mx-auto px-container-padding mt-20">
					<h2 className="text-heading-1 font-bold text-center text-gray-800 mb-12">{t('how_title')}</h2>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
						<StepCard
							icon={<FaUserPlus className="text-4xl" aria-label={t('steps.signup_title')} />}
							title={t('steps.signup_title')}
							description={t('steps.signup_desc')}
						/>
						<StepCard
							icon={<FaHandPointer className="text-4xl" aria-label={t('steps.bid_title')} />}
							title={t('steps.bid_title')}
							description={t('steps.bid_desc')}
						/>
						<StepCard
							icon={<FaTrophy className="text-4xl" aria-label={t('steps.win_title')} />}
							title={t('steps.win_title')}
							description={t('steps.win_desc')}
						/>
					</div>
				</div>
			</section>

			<Footer t={t} />
		</div>
	);
};

const FeatureCard = ({ title, description, icon }) => (
	<motion.div
		whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.1)" }}
		whileTap={{ scale: 0.97 }}
		className={`p-6 xs:p-8 rounded-xl xs:rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-400/50 text-center text-gray-800`}
		tabIndex={0}
		aria-label={title}
	>
		<div className={`text-3xl xs:text-4xl mb-4 xs:mb-6 flex justify-center`}>
			{icon}
		</div>
		<h2 className="mb-3 xs:mb-4 text-heading-3 font-bold text-gray-800 text-center">{title}</h2>
		<p className="text-body text-gray-600 leading-relaxed text-center">{description}</p>
	</motion.div>
);

FeatureCard.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	icon: PropTypes.element.isRequired,
};

const StepCard = ({ icon, title, description }) => (
	<div className="bg-white p-6 text-center rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
		<div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white">
		{icon}
		</div>
		<h3 className="text-heading-2 font-bold text-gray-800 mb-2">{title}</h3>
		<p className="text-body text-gray-600">{description}</p>
	</div>
);

StepCard.propTypes = {
	icon: PropTypes.element.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

const Footer = ({ t }) => (
	<footer className="mt-16 py-8 bg-gray-800 text-gray-300 text-center">
		<div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
			<div className="font-bold text-lg text-white">BidBud</div>
			<nav className="flex gap-6">
				<a href="/" className="hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-all">{t('footer.home')}</a>
				<a href="/auctions" className="hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-all">{t('footer.auctions')}</a>
				<a href="/login" className="hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-all">{t('footer.login')}</a>
				<a href="/signup" className="hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-all">{t('footer.signup')}</a>
			</nav>
			<div className="text-sm">© {new Date().getFullYear()} BidBud. {t('footer.copyright')}</div>
		</div>
	</footer>
);

Footer.propTypes = {
	t: PropTypes.func.isRequired,
};

export default Home;
