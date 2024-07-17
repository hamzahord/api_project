module.exports = (supabase) => {
  return {
    create: async (article) => {
      let { data, error } = await supabase
        .from('articles')
        .insert([article])
        .single();
      if (error) throw error;
      return data;
    },
    findAll: async () => {
      let { data, error } = await supabase
        .from('articles')
        .select('*');
      if (error) throw error;
      return data;
    },
    findById: async (id) => {
      let { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    updateById: async (id, updateData) => {
      let { data, error } = await supabase
        .from('articles')
        .update(updateData)
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    deleteById: async (id) => {
      let { data, error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    }
  };
};
