module.exports = {
  apps : [{
    name: 'LouTube',
    script: './server/server.js',
    env: {
      SSR: 0
    },
    env_production: {
      SSR: 1
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '47.99.122.43',
      ref  : 'origin/main',
      repo : 'git@github.com:lfli/loutube.git',
      path : '/root/projects/production',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npm run build:ssr && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
