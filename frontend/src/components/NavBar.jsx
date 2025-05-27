import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const NavBar = () => {
	const { isLoggedIn } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const { t, i18n } = useTranslation();

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	return (
		<nav className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 shadow-lg">
			<div className="container mx-auto flex items-center justify-between">
				<Link className="text-xl font-bold text-yellow-500" to="/">
					BidBud
				</Link>
				<button
					className="lg:hidden text-white focus:outline-none"
					onClick={() => setIsOpen(!isOpen)}
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16m-7 6h7"
						></path>
					</svg>
				</button>
				<div
					className={`w-full lg:flex lg:items-center lg:w-auto ${
						isOpen ? "block" : "hidden"
					}`}
				>
					<ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 mt-4 lg:mt-0 items-center">
						<li>
							<Link
								className="text-white hover:text-gray-300 text-lg"
								to="/"
							>
								{t('footer.home')}
							</Link>
						</li>
						<li>
							<Link
								className="text-white hover:text-gray-300 text-lg"
								to="/auctions"
							>
								{t('footer.auctions')}
							</Link>
						</li>
						{!isLoggedIn && (
							<>
								<li>
									<Link
										className="text-white hover:text-gray-300 text-lg"
										to="/login"
									>
										{t('footer.login')}
									</Link>
								</li>
								<li>
									<Link
										className="text-white hover:text-gray-300 text-lg"
										to="/signup"
									>
										{t('footer.signup')}
									</Link>
								</li>
							</>
						)}
						{isLoggedIn && (
							<>
								<li>
									<Link
										className="text-white hover:text-gray-300 text-lg"
										to="/profile"
									>
										Profile
									</Link>
								</li>
								<li>
									<Link
										className="text-white hover:text-gray-300 text-lg"
										to="/logout"
									>
										Logout
									</Link>
								</li>
							</>
						)}
						<li>
							<select
								value={i18n.language}
								onChange={e => changeLanguage(e.target.value)}
								className="bg-gray-800 text-white rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
								aria-label="Select language"
							>
								<option value="en">English</option>
								<option value="fr">Français</option>
							</select>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
