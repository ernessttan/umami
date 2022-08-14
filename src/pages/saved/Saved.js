/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useContext, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth';
import useUserProfile from '../../hooks/useUserProfile';
import Header from '../../components/layout/Header';
import MainLayout from '../../components/layout/MainLayout';
import MobileNav from '../../components/layout/MobileNav';
import SearchBar from '../../components/SearchBar';
import { getSavedPosts } from '../../firebase/functions';
import CardGrid from '../../components/CardGrid';
import RecipeCard from '../../components/RecipeCard';
import 'react-loading-skeleton/dist/skeleton.css';

function Saved() {
  const { authUser } = useContext(AuthContext);
  const { profile } = useUserProfile(authUser.uid);
  const [savedRecipes, setSavedRecipes] = useState();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter results by search query
  const filterResults = (query, recipeArr) => recipeArr.filter(
    (recipe) => recipe.title.toLowerCase().includes(query) && recipe.uid !== authUser.uid,
  );

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (profile.savedPosts.length > 0) {
        try {
          await getSavedPosts(profile.uid, profile.savedPosts)
            .then((savedRecipes) => {
              const filteredResults = filterResults(searchQuery, savedRecipes);
              setSavedRecipes(filteredResults);
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        setTimeout(
          () => {
            setSavedRecipes([]);
          },
          1000,
        );
      }
    };
    if (profile) {
      fetchSavedRecipes();
    }
  }, [profile, searchQuery]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value.toLowerCase());
  };

  return profile && (
    <div>
      <Header />
      <MainLayout className="p-5">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleChange={handleChange}
        />
        <div>
          { savedRecipes === undefined ? (
            <CardGrid className="py-5">
              <Skeleton count={10} height={130} width="100%" />
              <Skeleton count={10} height={130} width="100%" />
              <Skeleton count={10} height={130} width="100%" />
            </CardGrid>
          ) : savedRecipes.length === 0 ? (
            <div className="flex flex-col items-center mt-10">
              <h1 className="text-grey-500">No Posts Saved</h1>
              <Link to="/explore" className="text-orange-500 font-semibold py-3 hover:underline decoration-2">
                Try Saving Some Recipes
              </Link>
            </div>
          ) : savedRecipes ? (
            <CardGrid className="py-5">
              {savedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.rid}
                  rid={recipe.rid}
                  title={recipe.title}
                  image={recipe.image}
                  likes={recipe.likes}
                />
              ))}
            </CardGrid>
          ) : null}
        </div>
      </MainLayout>
      <MobileNav />
    </div>
  );
}

export default Saved;
