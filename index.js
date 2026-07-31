// This just imports and runs your .mjs file
import('./server.mjs').catch(err => {
    console.error('Failed to start app:', err);
    process.exit(1);
});