import { useProfile }  from '../hooks/useProfile';

export default function Profile() {
    const { profile, loading } = useProfile();

    if (loading) return 'Loading...';


    return (
        <section>
            <h2 className="text-3xl font-bold mb-8">Profile</h2>

            <div className="space-y-10">
                
                    <div key={profile.id}>
                        <h3 className="text-xl font-semibold">{profile.name}</h3>

                        <p className="text-neutral-400">{profile.description}</p>
                    </div>
               
            </div>
        </section>
    );
}