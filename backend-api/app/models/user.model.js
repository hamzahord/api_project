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
    }
  };
};
