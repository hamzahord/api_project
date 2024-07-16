module.exports = (supabase) => {
  return {
    create: async (role) => {
      let { data, error } = await supabase
        .from('roles')
        .insert([role]);
      if (error) throw error;
      return data;
    },
    findAll: async () => {
      let { data, error } = await supabase
        .from('roles')
        .select('*');
      if (error) throw error;
      return data;
    }
  };
};
