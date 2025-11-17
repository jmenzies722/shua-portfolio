# How to Check Your GitHub Actions Pipeline

## Quick Links

**GitHub Actions Dashboard:**
- **Web UI:** https://github.com/jmenzies722/shua-portfolio/actions
- **Direct workflow:** https://github.com/jmenzies722/shua-portfolio/actions/workflows/deploy.yml

## Methods to Check Pipeline Status

### 1. **Via GitHub Web UI** (Easiest)
1. Go to: https://github.com/jmenzies722/shua-portfolio/actions
2. You'll see a list of all workflow runs
3. Click on any run to see:
   - ✅ **Green checkmark** = Success
   - ❌ **Red X** = Failed
   - 🟡 **Yellow circle** = In Progress
   - ⚪ **Gray circle** = Queued

### 2. **Via GitHub CLI** (Command Line)

**List recent runs:**
```bash
gh run list --limit 10
```

**View specific run details:**
```bash
gh run view <RUN_ID>
```

**View logs for a failed run:**
```bash
gh run view <RUN_ID> --log
```

**Watch a run in real-time:**
```bash
gh run watch <RUN_ID>
```

### 3. **Check if Secrets are Configured**

**Via Web UI:**
1. Go to: https://github.com/jmenzies722/shua-portfolio/settings/secrets/actions
2. Verify these 4 secrets exist:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_S3_BUCKET`
   - `AWS_CLOUDFRONT_DISTRIBUTION_ID`

**Via CLI:**
```bash
gh secret list
```

## Common Issues

### ❌ **Pipeline Fails: "Secret not found"**
**Solution:** Add the missing secrets:
1. Go to: https://github.com/jmenzies722/shua-portfolio/settings/secrets/actions
2. Click "New repository secret"
3. Add each secret from `DEPLOYMENT_OUTPUTS.md`

### ❌ **Pipeline Fails: "Build failed"**
**Solution:** Check the build logs:
```bash
gh run view <RUN_ID> --log | grep -A 10 "error"
```

### ❌ **Pipeline Fails: "Access Denied"**
**Solution:** Verify AWS credentials are correct:
- Check `AWS_ACCESS_KEY_ID` matches Terraform output
- Check `AWS_SECRET_ACCESS_KEY` matches Terraform output

## Trigger a New Deployment

### Option 1: Push to main branch
```bash
git add .
git commit -m "Trigger deployment"
git push origin main
```

### Option 2: Manual trigger (if workflow_dispatch is enabled)
1. Go to: https://github.com/jmenzies722/shua-portfolio/actions/workflows/deploy.yml
2. Click "Run workflow"
3. Select branch: `main`
4. Click "Run workflow"

## Monitor Pipeline Status

**Watch the latest run:**
```bash
gh run watch
```

**Get status of latest run:**
```bash
gh run list --limit 1 --json status,conclusion,createdAt --jq '.[0]'
```

## Expected Pipeline Flow

1. ✅ **Checkout code** - Downloads your repo
2. ✅ **Setup Node.js** - Installs Node.js 20
3. ✅ **Install dependencies** - Runs `npm ci`
4. ✅ **Build Next.js app** - Runs `npm run build`
5. ✅ **Configure AWS credentials** - Sets up AWS CLI
6. ✅ **Deploy to S3** - Uploads files to S3 bucket
7. ✅ **Invalidate CloudFront** - Clears CloudFront cache
8. ✅ **Deployment summary** - Shows success message

## Success Indicators

When the pipeline succeeds, you'll see:
- ✅ All steps completed with green checkmarks
- 📦 Files uploaded to S3
- 🌐 CloudFront invalidation created
- 🎉 "Deployment completed successfully!" message

## Your Current Status

**Repository:** `jmenzies722/shua-portfolio`
**Workflow:** `Deploy to AWS`
**Recent runs:** Check with `gh run list`

---

**Need help?** Check the logs:
```bash
gh run view --log
```

