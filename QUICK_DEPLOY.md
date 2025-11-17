# Quick Deploy Guide

## ✅ Setup Complete!

Your GitHub Actions pipeline is now configured and ready for push-to-deploy!

## 🚀 How to Deploy

Simply push to the `main` branch:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

The pipeline will automatically:
1. ✅ Build your Next.js app
2. ✅ Deploy to S3
3. ✅ Invalidate CloudFront cache
4. ✅ Your site goes live!

## 📊 Check Pipeline Status

**Via Web:**
- https://github.com/jmenzies722/shua-portfolio/actions

**Via CLI:**
```bash
gh run list --limit 5
gh run watch  # Watch latest run in real-time
```

## 🎯 Performance Optimizations Applied

✅ **Mobile Optimizations:**
- Reduced backdrop-filter blur (20px vs 40px)
- Disabled GPU acceleration on mobile
- Faster animations (0.2s vs 0.3s)
- Disabled parallax effects on mobile
- Reduced memory usage

✅ **Web Optimizations:**
- Full animations and effects enabled
- GPU acceleration for smooth animations
- Optimized build settings
- CSS optimization enabled

✅ **Accessibility:**
- Respects `prefers-reduced-motion`
- Proper image loading attributes
- Touch-optimized scrolling

## 🔍 Your Site

**Live URL:** https://dp5tjfz6rf4o2.cloudfront.net

## 📝 Secrets Configured

All GitHub Secrets are set:
- ✅ AWS_ACCESS_KEY_ID
- ✅ AWS_SECRET_ACCESS_KEY  
- ✅ AWS_S3_BUCKET
- ✅ AWS_CLOUDFRONT_DISTRIBUTION_ID

## 🐛 Troubleshooting

**Pipeline fails?**
- Check logs: `gh run view --log`
- Verify secrets: `gh secret list`
- Check Terraform outputs: `cd terraform && terraform output`

**Site not updating?**
- CloudFront cache may take 2-5 minutes to clear
- Check invalidation status in AWS Console

**Performance issues?**
- See `PERFORMANCE.md` for optimization details
- Test on real mobile devices
- Run Lighthouse audit

---

**That's it!** Just push to `main` and your site deploys automatically! 🎉

