const getRenderData = (data = {}) => {
  const context = {
    user: data.user || null,
  };
  return {
    head: { context },
    nav: { context },
    menu: { context },
    scripts: { context },
    context,
    ...data,
  };
};

module.exports = {
  getRenderData,
};
