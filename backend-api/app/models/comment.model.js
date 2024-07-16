module.exports = (supabase) => {
    return {
      create: async (comment) => {
        let { data, error } = await supabase
          .from('comments')
          .insert([comment])
          .single();
        if (error) throw error;
        return data;
      },
      findAllByArticleId: async (article_id) => {
        let { data, error } = await supabase
          .from('comments')
          .select('id, content, created_at, user_id, users(username)')
          .eq('article_id', article_id)
          .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
      }
    };
  };
  