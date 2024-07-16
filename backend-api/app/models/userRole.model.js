module.exports = (supabase) => {
    return {
      create: async (userRole) => {
        let { data, error } = await supabase
          .from('user_roles')
          .insert([userRole]);
        if (error) throw error;
        return data;
      },
      findAll: async () => {
        let { data, error } = await supabase
          .from('user_roles')
          .select('*');
        if (error) throw error;
        return data;
      }
    };
  };
  