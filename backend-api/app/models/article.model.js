module.exports = (supabase) => {
    return {
      create: async (article) => {
        let { data, error } = await supabase
          .from('articles')
          .insert([article]);
        if (error) throw error;
        return data;
      },
      findAll: async () => {
        let { data, error } = await supabase
          .from('articles')
          .select('*');
        if (error) throw error;
        return data;
      }
    };
  };
  