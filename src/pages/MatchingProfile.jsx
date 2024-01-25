import React from 'react';
import '../index.css';
import HeaderImg from '../assets/matchingprofile.png';
import Footer from '../components/Footer';
import ReviewTable from '../components/MatchingProfile/ReviewTable';
import PostTable from '../components/MatchingProfile/PostTable';
import ProfileTable from '../components/MatchingProfile/ProfileTable';

export default function MatchingProfile() {
    return (
        <div>
            <img src={HeaderImg} alt="headerImg" />
            <ProfileTable />
            <div className="ContentsBox">
                <PostTable />
                <ReviewTable />
            </div>
            <Footer />
        </div>
    );
}
