function Profile() {
  return (
    <div className="h-full">
      <div>
        <ProfileHeader />
        <Information />
        <Actions />
        <ProfileFeed />
      </div>
      <Navbar />
    </div>
  );
}

export default Profile;
