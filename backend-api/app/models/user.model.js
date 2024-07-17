module.exports = (supabase) => {
  return {
    create: async (user) => {
      let { data, error } = await supabase
        .from('users')
        .insert([user]);
      if (error) throw error;
      return data;
    },
    findAll: async () => {
      let { data, error } = await supabase
        .from('users')
        .select('*');
      if (error) throw error;
      return data;
    },
    findById: async (id) => {
      let { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    findOrCreateGoogleUser: async (profile) => {
      let { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('google_id', profile.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!data) {
        let { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert([{
            google_id: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value
          }])
          .single();

        if (insertError) throw insertError;
        return newUser;
      }

      return data;
    }
  };
};